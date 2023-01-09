# Super-Resolution
Image Super-Resolution as a service


## Installation guide

### Server

Make sure you have `Python` installed on your system. This project has been
developed under `3.10` version.

Create a new virtual environment for this project:
```bash
python -m venv venv
```

> If you have trouble with the previous step, try `python3` instead.

Activate it depending on your operating system:

1. Unix
```bash
source venv/bin/activate
```

2. Windows
```ps1
.\venv\Scripts\Activate.ps1
```

> Later on, you can exit the virtual environment via `deactivate` command.

After that, you can install the required dependencies.
```bash
pip install -r requirements.txt
```

You can run the server with the following command:
```bash
uvicorn api.main:app

# If you want to specify host address and port number.
uvicorn api.main:app --host 127.0.0.1 --port 8000
```

Visit http://127.0.0.1:8000/docs to learn more about the API.

### Client

Make sure you have `Node` installed on your system. This project has been
developed under `17.6.0` version. You will also need `npm` `8.9.0` or higher.

You can run the following commands to install all the dependencies needed
```bash
cd client
npm i
```

To launch the server locally, execute the following command:
```bash
npm run dev
```
