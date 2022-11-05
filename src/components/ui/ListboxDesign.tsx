import { Listbox } from "@headlessui/react";

function ListboxDesign({
  onChange,
  value,
  list,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
  value: string;
  list: string[];
}) {
  let i = 0;
  const options = list.map((o) => {
    return { id: i++, name: o };
  });

  return (
    <Listbox
      value={options.find((o) => o.name == value)}
      onChange={(o) => onChange(o.name)}
    >
      <Listbox.Button>{value}</Listbox.Button>
      <Listbox.Options>
        {options.map((item) => (
          <Listbox.Option key={item.id} value={item}>
            {item.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export default ListboxDesign;
