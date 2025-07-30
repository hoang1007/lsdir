# lsdir — A Simple Google Drive Index

> Streamlined and hacker-friendly Google Drive file explorer built with Next.js, Tailwind CSS, and the Google Drive API.

![Preview](./public/cat-walk.gif)

## 🚀 Core Features

- **⚡ Fast Browsing** – Server-side caching for smooth navigation.
- **🔐 Secure Access** – Google Service Account runs on the backend; no client keys exposed.
- **🖼️ Media Previews** – Image modals, PDF readers, and video streaming.
- **🧩 Thumbnails** – Visual file grid powered by Google Drive thumbnails.

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Google Drive API**
- **shadcn/ui**

---

## ⚙️ Getting Started

### 1. Prerequisites

- Create a **Google Service Account** from [Google Cloud Console](https://console.cloud.google.com/).
- Get your **Folder ID** from the Google Drive folder URL.
- **Share the folder** with your service account’s `service account email` (Viewer permission).

---

### 2. Installation

```bash
git clone https://github.com/YOUR_USERNAME/lsdir.git
cd lsdir
npm install
```

### 3. Environment Setup

#### On macOS/Linux

```bash
base64 -w 0 /path/to/your-service-account-key.json
```

#### On Windows (PowerShell)

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("/path/to/key.json"))
```

```bash
cp .env.example .env
```

change the `.env` file to include your Google Service Account credentials and Drive folder ID.

```bash
GOOGLE_SERVICE_ACCOUNT_BASE64=<your_base64_encoded_service_account_key>
GOOGLE_DRIVE_ROOT_FOLDER_ID=<your_google_drive_folder_id>
```

### 4. Run the Application

```bash
npm run dev
```

Open your browser to http://localhost:3000 and you should see your Google Drive folder contents displayed at http://localhost:3000/drive.

## License

MIT License. See [LICENSE](LICENSE) for details.
