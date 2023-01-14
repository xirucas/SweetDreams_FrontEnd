import { Loader, Placeholder } from "rsuite"
import "./loader.css"
export const ScreenLoader = () => {


  return (
    <div>
        <Placeholder.Paragraph rows={8} /> 
        <Loader backdrop content="loading..." vertical />
    </div>
  );
};
