import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileIcon,
  FileTextIcon,
  FileImageIcon,
  FileArchiveIcon,
  CopyIcon,
  XIcon,
} from "lucide-react";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  uploadedAt: Date;
  url: string;
};

const FileUpload: React.FC<{ onFileUpload: (file: UploadedFile) => void }> = ({
  onFileUpload,
}) => {
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a valid file type.",
        });
        return;
      }

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("File reading was aborted");
        reader.onerror = () => {
          toast({
            title: "Upload Failed",
            description: `Failed to upload ${file.name}. Please try again.`,
          });
        };
        reader.onload = () => {
          // Simulate file upload
          const uploadedFile: UploadedFile = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            uploadedAt: new Date(),
            url: URL.createObjectURL(file),
          };

          const interval = setInterval(() => {
            uploadedFile.progress += 10;
            onFileUpload({ ...uploadedFile });
            if (uploadedFile.progress >= 100) {
              clearInterval(interval);
              toast({
                title: "File Uploaded",
                description: `${file.name} has been successfully uploaded.`,
              });
            }
          }, 500);
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [onFileUpload, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/plain": [".txt"],
      "application/zip": [".zip"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-gray-300 hover:border-primary"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop files here, or click to select files</p>
      )}
      <Button className="mt-4">Browse Files</Button>
    </div>
  );
};

const UploadedFile: React.FC<{
  file: UploadedFile;
  onRemove: (id: string) => void;
}> = ({ file, onRemove }) => {
  const { toast } = useToast();

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <FileImageIcon />;
    if (type.includes("pdf")) return <FileIcon />;
    if (type.includes("word")) return <FileTextIcon />;
    if (type.includes("zip")) return <FileArchiveIcon />;
    return <FileIcon />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const copyLink = () => {
    navigator.clipboard.writeText(file.url);
    toast({
      title: "Link Copied",
      description: "The file link has been copied to your clipboard.",
    });
  };

  const shareFile = () => {
    toast({
      title: "Share File",
      description: `Sharing link: ${file.url}`,
    });
    // You can implement additional sharing logic here if needed
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {getFileIcon(file.type)}
            {file.name}
          </span>
          <Button variant="ghost" size="icon" onClick={() => onRemove(file.id)}>
            <XIcon className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          {formatFileSize(file.size)} • {file.type} • Uploaded{" "}
          {file.uploadedAt.toLocaleTimeString()}
        </p>
        {file.progress < 100 && (
          <Progress value={file.progress} className="mt-2" />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="w-full mr-2" onClick={copyLink}>
          <CopyIcon className="mr-2 h-4 w-4" /> Copy Link
        </Button>
        <Button variant="outline" className="w-full" onClick={shareFile}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Sharing() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFileUpload = (file: UploadedFile) => {
    setFiles((prevFiles) => {
      const existingFileIndex = prevFiles.findIndex((f) => f.id === file.id);
      if (existingFileIndex !== -1) {
        const updatedFiles = [...prevFiles];
        updatedFiles[existingFileIndex] = file;
        return updatedFiles;
      } else {
        return [...prevFiles, file];
      }
    });
  };

  const removeFile = (id: string) => {
    const fileToRemove = files.find((file) => file.id === id);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <FileUpload onFileUpload={handleFileUpload} />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {files.map((file) => (
                <UploadedFile key={file.id} file={file} onRemove={removeFile} />
              ))}
            </div>
          </div>
        </main>
      </div>
      <ToastViewport />
    </ToastProvider>
  );
}