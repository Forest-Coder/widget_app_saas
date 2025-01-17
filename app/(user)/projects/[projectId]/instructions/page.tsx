import CopyBtn from "@/components/copy-btn";

export default function Page({ params }: {
  params: {
    projectId: string
  }
}){
  if (!params.projectId) return (<div>Invalid Project ID</div>);
  if (!process.env.WIDGET_URL) return (<div>Missing WIDGET_URL</div>);

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Embed the Codes in Your Website</h1>
      <div className=" bg-black p-6 rounded-md mt-6 relative">
        <code className="text-white">
          {`<my-widget project-id="${params.projectId}"></my-widget>`}
          <br />
          {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        </code>
        <CopyBtn text={`<my-widget project-id="${params.projectId}"></my-widget>\n<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`} />
      </div>
    </div>
  )
}
