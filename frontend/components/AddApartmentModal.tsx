"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";

interface AddApartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddApartmentModal({
  isOpen,
  onClose
}: AddApartmentModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    area: "",
    price: ""
  });
  const [errors, setErrors] = useState({
    title: false,
    address: false,
    area: false,
    price: false
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: !formData.title,
      address: !formData.address,
      area: !formData.area || Number(formData.area) <= 0,
      price: !formData.price || Number(formData.price) <= 0
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    files.forEach((file) => {
      data.append("images", file);
    });

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await fetch("http://localhost:8000/apartments", {
        method: "POST",
        body: data
      });

      if (res.ok) {
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating apartment:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Create New Apartment
        </ModalHeader>
        <ModalBody>
          <Input
            label="Title"
            placeholder="Enter apartment title"
            value={formData.title}
            isInvalid={errors.title}
            errorMessage={errors.title && "Title is required"}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Input
            label="Address"
            placeholder="Enter address"
            value={formData.address}
            isInvalid={errors.address}
            errorMessage={errors.address && "Address is required"}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <Textarea
            label="Description"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <div className="flex gap-4">
            <Input
              type="number"
              label="Area (m²)"
              placeholder="Enter area"
              value={formData.area}
              isInvalid={errors.area}
              errorMessage={errors.area && "Valid area is required"}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
            />
            <Input
              type="number"
              label="Price ($)"
              placeholder="Enter price"
              value={formData.price}
              isInvalid={errors.price}
              errorMessage={errors.price && "Valid price is required"}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
          <Input
            type="file"
            label="Images (optional)"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          {files.length > 0 && (
            <div className="text-sm text-gray-600">
              {files.length} file(s) selected
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
