import { db } from "@/db";
import { eq } from "drizzle-orm";
import { projects as dbProjects } from "@/db/schema";
import Link from "next/link";
import { Globe, ChevronLeft, Code } from 'lucide-react';
import Table from "@/components/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default async function Page({ params }: {
  params: {
    projectId: string
  }
})  {
  if (!params.projectId) return (<div>Invalid Project ID</div>);

  const projects = await db.query.projects.findMany({
    where: (eq(dbProjects.id, params.projectId)),
    with: {
      feedbacks: true
    }
  });

  const project = projects[0];

  return (
    <div>
      <div>
        <Link href="/dashboard" className="flex items-center text-gray-300 mb-5 w-fit hover:text-blue-500"><ChevronLeft className="h-5 w-5 mr-0.5" /><span className="text-lg ">Back to projects</span></Link>
      </div>
      <Card>
        <div className="flex justify-between items-start">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{project.name}</CardTitle>
            <CardDescription className="text-lg">{project.description}</CardDescription>
            <div className="flex flex-col ">
              {project.url ? <Link href={project.url} className="hover:text-blue-500 text-gray-300 flex items-center">
              <Globe className="h-5 w-5 mr-1" /><span className="text-lg">Visit Site</span></Link> : null}
              <Link href={`/projects/${params.projectId}/instructions`} className="hover:text-blue-500 text-gray-300 flex items-center ">
                <Code className="h-5 w-5 mr-1" /><span className="text-lg">Show Code</span></Link>
            </div>
          </CardHeader>



        </div>

        <CardContent>
          <Table data={project.feedbacks} />
        </CardContent>
      </Card>
    </div>
  )
}
