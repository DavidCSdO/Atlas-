type LexicalNode = {
  children?: LexicalNode[];
  tag?: string;
  text?: string;
  type?: string;
};

type RichTextValue = {
  root?: {
    children?: LexicalNode[];
  };
};

type Props = {
  content?: RichTextValue | null;
};

function renderChildren(children?: LexicalNode[]) {
  return children?.map((child, index) => renderNode(child, index)) ?? null;
}

function renderNode(node: LexicalNode, index: number) {
  if (node.type === 'text') {
    return <span key={index}>{node.text}</span>;
  }

  if (node.type === 'heading') {
    const Tag = node.tag === 'h3' ? 'h3' : 'h2';

    return (
      <Tag key={index} className="mt-10 mb-4 text-2xl font-bold text-text">
        {renderChildren(node.children)}
      </Tag>
    );
  }

  if (node.type === 'list') {
    return (
      <ul key={index} className="my-6 list-disc pl-6 text-muted">
        {renderChildren(node.children)}
      </ul>
    );
  }

  if (node.type === 'listitem') {
    return <li key={index}>{renderChildren(node.children)}</li>;
  }

  if (node.type === 'quote') {
    return (
      <blockquote key={index} className="my-8 border-l-4 border-primary pl-5 text-xl text-muted">
        {renderChildren(node.children)}
      </blockquote>
    );
  }

  return (
    <p key={index} className="mb-5 leading-8 text-muted">
      {renderChildren(node.children)}
    </p>
  );
}

export function RichText({ content }: Props) {
  const nodes = content?.root?.children;

  if (!nodes?.length) {
    return null;
  }

  return <>{renderChildren(nodes)}</>;
}
