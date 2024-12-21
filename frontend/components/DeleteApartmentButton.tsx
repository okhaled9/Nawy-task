"use client";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoTrash } from "react-icons/io5";

interface DeleteApartmentButtonProps {
  apartmentId: string;
}

export default function DeleteApartmentButton({
  apartmentId
}: DeleteApartmentButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://backend:8000/apartments/${apartmentId}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      if (response.status === 204) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error("Failed to delete apartment");
      }
    } catch (error) {
      console.error("Error deleting apartment:", error);
      setIsModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        color="danger"
        variant="flat"
        onPress={() => setIsModalOpen(true)}
        startContent={<IoTrash className="text-xl" />}
      >
        Delete Apartment
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete Apartment
          </ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete this apartment? This action cannot
              be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={() => setIsModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete} isLoading={isLoading}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
