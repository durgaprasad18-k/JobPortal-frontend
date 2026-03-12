import { useEffect, useState } from 'react';
import { Checkbox, Combobox, Group, Input, Pill, PillsInput, ScrollArea, useCombobox } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';
import { updateFilter } from '../../Slices/FilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

const MultiInput = (props:any) => {
    const dispatch=useDispatch();
    const filter=useSelector((state:any)=>state.filter);
    useEffect(()=>{
        setData(props.options);
        
    },[])
    useEffect(()=>{
        setValue(filter[props.title]??[])
    }, [filter])
    const combobox = useCombobox({
        onDropdownClose: () =>
            combobox.resetSelectedOption(),

        onDropdownOpen: () =>
            combobox.updateSelectedOptionIndex('active')

    });
    const [search, setSearch] = useState('');
    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string[]>([]);
    const exactOptionMatch = data.some((item) => item === search);
    const handleValueSelect = (val: string) => {
        setSearch('');
        if (val === '$create') {
            setData((current) => [...current, search]);
            setValue((current) => [...current, search]);
            dispatch(updateFilter({[props.title]:[...value, search]}));
        } else {
            dispatch(updateFilter({[props.title]:value.includes(val) ? value.filter((v) => v !== val) : [...value, val]}));
            setValue((current) =>
                current.includes(val) ? current.filter((v) => v !== val) : [...current, val]);
            
        }
    }

    const handleValueRemove = (val: string) =>{
        dispatch(updateFilter({[props.title]:value.filter((v) => v !== val)}));
        setValue((current) => current.filter((v) => v !== val));
    }
    const values = value
        .slice(0,1)
        .map((item) => (
            <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
                {item.length>=10?item.substring(0, 8)+"..":item}
            </Pill>
        ));


    const options = data
        .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase())).map((item, index) => (
            <Combobox.Option value={item} key={item} active={value.includes(item)}
                className="animate-option-animation opacity-0" 
                style={{ animationDelay: `${index * 30}ms` }}
            >
                <Group gap="sm">
                    <Checkbox
                    size='xs'
                        color='brightSun.4'
                        checked={value.includes(item)}
                        onChange={() => {
                            if(value.includes(item))updateFilter({[props.title]:value.filter((v) => v !== item)});
                            else updateFilter({[props.title]:[...value, item]});
                         }}
                        aria-hidden
                        tabIndex={-1}
                        style={{ pointerEvents: 'none' }}
                    />
                    <span className='text-mine-shaft-300'>{item}</span>
                </Group>
            </Combobox.Option>
        ));

    return (
        <Combobox  store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
            <Combobox.DropdownTarget>
                <PillsInput variant='unstyled' size="sm" pointer onClick={() => combobox.toggleDropdown()}
                    leftSection={<div className="bg-mine-shaft-900 rounded-full mr-2 text-bright-sun-400 p-1"><props.icon size={20} /> </div>}
                    rightSection={<IconSelector  />}
                >

                    <Pill.Group>
                        {value.length > 0 ? (
                            <>
                                {values}
                                {value.length > 1 && (
                                    <Pill >+{value.length - 1} more</Pill>
                                )}
                            </>
                        ) : (
                            <Input.Placeholder className='!text-mine-shaft-300'>{props.title}</Input.Placeholder>
                        )}

                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown className='overflow-hidden'>
                <Combobox.Search className='w-full [&_input]:!px-2 '
                    variant="unstyled" placeholder="Search"
                    value={search}
                    onChange={(event) => {
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                />
                <Combobox.Options>

                    <ScrollArea.Autosize mah={200} type="scroll">
                        {options}

                        {!exactOptionMatch && search.trim().length > 0 && (
                            <Combobox.Option value="$create">+ {search}</Combobox.Option>
                        )}

                        {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
                            <Combobox.Empty>Nothing found</Combobox.Empty>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
export default MultiInput;