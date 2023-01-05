<div align="center">
    <img src="icon.svg" height="100" alt="Logo"><br/>
    <strong>Marving is a virtual host that summarizes governance proposals.</strong>
</div>

### How it works:
The commands you need to setup and use the enviroment are:

```
# Install dependencies
npm install
npm link typescript

# Set up your environment variables
cp .env.example .env
pico .env

# Run script that exports files to ./public/
npx ts-node export-xxxxx.ts

# Add a job the the daily process that collects and publish data
pico .github/workflows/pull-data.yml
```

## Copyright & License

This repository is protected with a standard Apache 2 license. See the terms and conditions in the [LICENSE](LICENSE) file.
