"use client";

import { useParams } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { useProject } from "@/components/project-context";
import { useEffect, useState } from "react";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { projectId } = useParams();
  const { allProjects, currentProject, setCurrentProject, isHydrated } =
    useProject();

  useEffect(() => {
    if (isHydrated) {
      const project = allProjects.find((p) => p.id === projectId);
      if (project) {
        setCurrentProject(project);
      }
    }
  }, [projectId, allProjects, setCurrentProject, isHydrated]);

  // Wait for hydration to complete
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sylvia-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        key={`${currentProject?.id}-${currentProject?.progress}-${currentProject?.status}`}
        projectId={projectId}
        project={currentProject || allProjects.find((p) => p.id === projectId)}
      />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
