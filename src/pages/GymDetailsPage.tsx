import { useParams } from "react-router-dom";

export default function GymDetailsPage() {

  const {slug} = useParams()

  return <div className="p-6">{slug}</div>;
}
