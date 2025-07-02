'use client';

type Service = {
  name: string;
  description?: string;
};

type Props = {
  services: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function ServiceFilter({ services, selected, onChange }: Props) {
  const toggle = (name: string) => {
    const newSel = selected.includes(name)
      ? selected.filter((s) => s !== name)
      : [...selected, name];
    onChange(newSel);
  };

  return (
    <div>
      {services.map((s) => (
        <label key={s} className="flex items-center mb-2">
          <input
            type="checkbox"
            value={s}
            checked={selected.includes(s)}
            onChange={() => toggle(s)}
            className="mr-2"
          />
          <span className="text-gray-700">{s}</span>
        </label>
      ))}
    </div>
  );
}
