# Calorie Counter

## Utils
```shell
# Extraction des tags
grep -h "^tags:" *.md | sed 's/tags: \[//g' | sed 's/\]//g' | tr ',' '\n' | sed 's/"//g' | sed 's/^ *//g' | sed 's/ *$//g' | sort -u 
```
