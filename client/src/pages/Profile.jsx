import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { app } from "../config/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
      },
      (error) => {
        setUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.profilePicture}
          alt="Profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="self-center text-sm">
          {uploadError ? (
            <span className="text-red-700">Error Uploading Image</span>
          ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
            <span className="text-slate-700"> {`Uploading : ${uploadPercentage} %`} </span>
          ) : uploadPercentage === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : ''}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="New Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
