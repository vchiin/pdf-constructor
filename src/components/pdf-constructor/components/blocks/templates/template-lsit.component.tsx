import { TemplateThumbnail } from "./template-thumbnail.component";

export const TemplateList = () => (
  <div className="grid gap-1 @xs:grid-cols-2 @sm:grid-cols-2">
    <TemplateThumbnail id="template-1" title="Base Elements" />
    <TemplateThumbnail id="template-2" title="Columns" />
    <TemplateThumbnail id="template-3" title="Tables" />
    <TemplateThumbnail id="template-4" title="Object Loan Table" />
    <TemplateThumbnail id="template-5" title="Tenant List" />
  </div>
);
