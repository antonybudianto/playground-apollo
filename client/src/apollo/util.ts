import type { FieldNode } from "graphql";

export const extractDirective = (field: FieldNode | null) => {
  const directive = field?.directives?.find(
    (d) => d.name.value === "connection"
  );
  let directiveName = "";
  if (directive && directive.arguments && directive.arguments[0]) {
    // @ts-ignore
    directiveName = directive.arguments[0].value.value;
  }
  return { directive, directiveName };
};
