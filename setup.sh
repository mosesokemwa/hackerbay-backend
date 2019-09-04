function jwtSecret() {
    python -c 'import random; print("".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)]))'
}

echo "[GIT] cloning hacker-bay project....."
git clone git@github.com:mosesokemwa/hackerbay-backend.git
cd hackerbay-backend

echo "[hacker-bay] creating a jwtSecret key....."
echo "jwtSecret=$(jwtSecret)" >> .env
echo "[hacker-bay] installing project dependancies....."

npm install
