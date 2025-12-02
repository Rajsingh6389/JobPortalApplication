import { useState } from 'react';
import { Button, Combobox, useCombobox, Text, Box } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

const opt = ['Relevance', 'Most Recent', 'Salary (Low to High )', 'Salary (High to Low)'];

function Sort({onSortChange}) {
  const [selectedItem, setSelectedItem] = useState('Relevance');

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (


    <Combobox
      store={combobox}
      width={160}
      position="bottom-start"
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        onSortChange(val); 
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        
          <div onClick={()=>{
            combobox.toggleDropdown()
          }} className='cursor-pointer border border-bright-sun-400 flex gap-2 text-sm items-center px-1 py-2 rounded-xl'>
            {selectedItem} <IconAdjustments className='text-bright-sun-300 h-5 w-5' />

          </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>

  );
}

export default Sort;
