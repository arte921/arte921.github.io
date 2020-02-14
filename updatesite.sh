rm -rf $1
git clone "https://github.com/arte921/$1"
cd "$1"
rm -rf .git
cd ..
git stage *
git commit -m "updated $1 using script"
git push
