interface Props {
  text: string;
  dark?: boolean;
}

export default function Footer({ text, dark = false }: Props) {
  return (
    <div
      className={`px-4 py-4 text-center text-[10px] leading-relaxed ${
        dark ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-400'
      }`}
    >
      {text}
    </div>
  );
}
