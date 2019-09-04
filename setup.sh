function jwtSecret() {
    python -c 'import random; print("".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)]))'
}

git clone git@github.com:mosesokemwa/hackerbay-backend.git
cd hackerbay-backend
echo "jwtSecret=$(jwtSecret)" >> .env
npm install
