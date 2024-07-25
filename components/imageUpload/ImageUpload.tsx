import { useState, ChangeEvent } from "react";
import styles from "./ImageUpload.module.css";
import { Pencil } from "lucide-react";

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        onFileSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarUpload}>
        <div className={styles.avatarEdit}>
          <input
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
          />
          <label htmlFor="imageUpload" className="flex">
            <Pencil className="mx-auto text-slate-500 mt-1"></Pencil>
          </label>
        </div>
        <div className={styles.avatarPreview}>
          <div
            id="imagePreview"
            style={{
              backgroundImage: `url(${
                image || "http://i.pravatar.cc/500?img=7"
              })`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
