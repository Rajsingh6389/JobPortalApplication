import { useState } from "react";
import { Combobox, useCombobox } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";

const opt = [
  "Relevance",
  "Most Recent",
  "Salary (Low to High)",
  "Salary (High to Low)",
];

function Sort({ onSortChange }) {
  const [selectedItem, setSelectedItem] = useState("Relevance");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    <Combobox.Option
      className="!text-sm md:!text-xs px-2 py-1.5 rounded-lg hover:bg-mine-shaft-800 transition cursor-pointer"
      value={item}
      key={item}
    >
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      width={200}
      position="bottom-start"
      transitionProps={{ transition: "pop", duration: 150 }}
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        onSortChange(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <div
          onClick={() => {
            combobox.toggleDropdown();
          }}
          className="
            cursor-pointer border border-bright-sun-400/60 
            flex items-center justify-between 
            gap-2 
            px-3 py-2 
            text-sm md:text-xs
            rounded-xl text-bright-sun-200
            bg-mine-shaft-900 hover:bg-mine-shaft-800 
            transition-all select-none
            min-w-[150px]
          "
        >
          <span className="truncate">{selectedItem}</span>
          <IconAdjustments className="text-bright-sun-300 h-5 w-5" />
        </div>
      </Combobox.Target>

      <Combobox.Dropdown className="bg-mine-shaft-900 border border-mine-shaft-700 shadow-md rounded-xl overflow-hidden text-white">
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default Sort;
