export default function TemplateOne({ data }) {
    return (
      <div>
        <h1 className="text-4xl font-bold text-yellow-600">{data.name}</h1>
        <p className="text-gray-700">{data.email} | {data.phone}</p>
  
        <h2 className="text-xl mt-4 font-semibold text-yellow-700">Summary</h2>
        <p>{data.summary}</p>
  
        <h2 className="text-xl mt-4 font-semibold text-yellow-700">Skills</h2>
        <ul className="list-disc ml-5">
          {data.skills.split(",").map((s) => <li key={s}>{s}</li>)}
        </ul>
  
        <h2 className="text-xl mt-4 font-semibold text-yellow-700">Education</h2>
        <p>{data.education}</p>
  
        <h2 className="text-xl mt-4 font-semibold text-yellow-700">Experience</h2>
        <p>{data.experience}</p>
  
        <h2 className="text-xl mt-4 font-semibold text-yellow-700">Projects</h2>
        <p>{data.projects}</p>
      </div>
    );
  }
  