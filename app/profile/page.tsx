"use client";

import {  useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { profile, updateProfile } = useAuth();

  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");

  const name = profile?.name || "John Doe";
  const image = profile?.image || "/default.jpg";

  function handleSave() {
    const updatedProfile = {
      name: newName.trim() ? newName : name,
      image: newImage.trim() ? newImage : image,
    };

    updateProfile(updatedProfile);

    setNewName("");
    setNewImage("");
  }

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Profile */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={image}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full border"
            />
            <h2 className="text-lg font-semibold">{name}</h2>
          </div>

          {/* Edit Form */}
          <div className="space-y-2">
            <div>
              <Label className="py-2" htmlFor="name">
                Change Name
              </Label>
              <Input
                id="name"
                placeholder="Enter new name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div>
              <Label className="py-2" htmlFor="image">
                Change Profile Image (URL)
              </Label>
              <Input
                id="image"
                placeholder="Paste image URL"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
