#!/usr/bin/env bash -euo pipefail

function output {
    style_start=""
    style_end=""
    if [ "${2:-}" != "" ]; then
    case $2 in
        "success")
            style_start="\033[0;32m"
            style_end="\033[0m"
            ;;
        "error")
            style_start="\033[31;31m"
            style_end="\033[0m"
            ;;
        "info"|"warning")
            style_start="\033[33m"
            style_end="\033[39m"
            ;;
        "heading")
            style_start="\033[1;33m"
            style_end="\033[22;39m"
            ;;
    esac
    fi

    builtin echo -e "${style_start}${1}${style_end}"
}


function jwtSecret() {
    python -c 'import random; print("".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)]))'
}

PROJ_NAME="Hacker Bay Project"

output "${PROJ_NAME} installer" "heading"

# Run environment checks.
output "\nEnvironment check" "heading"

# Check that Git is installed.
command -v git >/dev/null 2>&1
if [ $? == 0 ]; then
    output "  [*] Git is installed" "success"
else
    output "  [ ] Warning: Git will be needed." "warning"
fi

# Check that NPM is installed.
command -v npm >/dev/null 2>&1
if [ $? == 0 ]; then
    output "  [*] NPM is installed" "success"
else
    output "  [ ] Warning: NPM will be needed." "warning"
fi

# Check that NODE is installed.
command -v node >/dev/null 2>&1
if [ $? == 0 ]; then
    output "  [*] NODE is installed" "success"
else
    output "  [ ] ERROR: NODE is required for installation." "error"
    exit 1
fi

# Cloning project
output "[*] Git cloning hacker-bay project" "heading"
git clone git@github.com:mosesokemwa/hackerbay-backend.git
output "[*] Git cloning hacker-bay project complete." "success"

cd hackerbay-backend

# Auto Generate jwtSecret key
output "[*] Generating a jwtSecret key" "heading"
echo "jwtSecret=$(jwtSecret)" >> .env
output "[*] jwtSecret key generated" "success"

# Install project node_modules
output "[*] Installing project dependancies....." "heading"
npm install
output "[*] Dependancies installed" "success"

