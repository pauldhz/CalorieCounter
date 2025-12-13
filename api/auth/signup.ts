import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env['FIREBASE_PROJECT_ID'],
      clientEmail: process.env['FIREBASE_CLIENT_EMAIL'],
      privateKey: process.env['FIREBASE_PRIVATE_KEY']?.replace(/\\n/g, '\n'),
    })
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, displayName } = req.body;

  // Validation des champs
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    // Créer l'utilisateur via l'API REST Firebase
    const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env['FIREBASE_API_KEY']}`;

    const response = await fetch(signUpUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Gestion des erreurs Firebase
      let errorMessage = 'Registration failed';

      if (data.error?.message === 'EMAIL_EXISTS') {
        errorMessage = 'Email already exists';
      } else if (data.error?.message === 'INVALID_EMAIL') {
        errorMessage = 'Invalid email format';
      } else if (data.error?.message === 'WEAK_PASSWORD') {
        errorMessage = 'Password is too weak';
      }

      return res.status(400).json({
        error: errorMessage,
        message: data.error?.message
      });
    }

    // Mettre à jour le displayName si fourni
    if (displayName) {
      await getAuth().updateUser(data.localId, {
        displayName: displayName
      });
    }

    // Récupérer les informations utilisateur complètes
    const user = await getAuth().getUser(data.localId);

    return res.status(201).json({
      success: true,
      token: data.idToken,
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || null
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({
      error: 'Registration failed',
      message: error.message
    });
  }
}

