import React from 'react'
import { State, none } from '@hookstate/core'
import { CharacterBook, TavernCardV2 } from 'src/spec'
import { InputLine } from './InputLine'
import { Header2 } from './Header2'
import { CheckBoxComponent } from './CheckBoxComponent'
import { CharacterBookEntries } from './CharacterBookEntries'
import { InputNumber } from './InputNumber'
import { InputExtensions } from './InputExtensions'
import { InputBox } from './InputBox'

export function CharacterBookComponent(props: { cardState: State<TavernCardV2> }) {
    const createCharacterBook = (): CharacterBook => {
        return {
            name: '',
            description: '',
            scan_depth: 2,
            token_budget: 500,
            recursive_scanning: false,
            entries: [],
            extensions: {},
        }
    }

    const bookState = props.cardState.data.character_book

    return (
        <React.Fragment>
            <div
                onClick={() => bookState.set(none)}
                className='text-interactive flex flex-row items-center hover:cursor-pointer select-none justify-between'
            >
                <Header2>世界书</Header2>
                {!!bookState.value && (
                    <div className='text-sm flex flex-row items-center'>
                        <span className='text-lg mr-2 material-symbols-outlined'>delete</span>
                    </div>
                )}
            </div>
            {!!bookState.value && (
                <React.Fragment>
                    <InputLine
                        name='lore.name'
                        label='Character Book Name'
                        placeholder='Optional, not used in prompt'
                        value={bookState.name?.value}
                        onChange={(v) => bookState.name.set(v)}
                    />
                    <InputBox
                        name='lore.description'
                        label='Character Book Description'
                        placeholder='Optional, not used in prompt'
                        rows={1}
                        value={bookState.description?.value}
                        onChange={(v) => bookState.description.set(v)}
                    />
                    <InputNumber
                        name='lore.scan_depth'
                        label='Scan Depth'
                        placeholder='Previous messages to scan for character book keywords'
                        value={bookState.scan_depth.value}
                        optional={true}
                        onChange={(v) => bookState.scan_depth.set(Math.floor(Number(v)))}
                        onDelete={() => bookState.scan_depth.set(none)}
                    />
                    <InputNumber
                        name='lore.token_budget'
                        label='Token Budget'
                        placeholder='Maximum tokens to add to prompt from character book entries'
                        value={bookState.token_budget.value}
                        optional={true}
                        onChange={(v) => bookState.token_budget.set(Math.floor(Number(v)))}
                        onDelete={() => bookState.token_budget.set(none)}
                    />
                    <CheckBoxComponent
                        name='lore.recursive_scanning'
                        label='Recursive Scanning'
                        checkBoxLabel='This entry content can trigger other character book entries'
                        placeholder='false'
                        value={bookState.recursive_scanning?.value}
                        onChange={() => bookState.recursive_scanning.set(!bookState.recursive_scanning.value)}
                    />
                    <InputExtensions
                        name='lore.extensions'
                        label='Book Extensions'
                        rows={2}
                        placeholder='{}'
                        value={bookState.extensions.value}
                        onChange={(v: Record<string, any>) => bookState.extensions.set(v)}
                    />
                    <CharacterBookEntries cardState={props.cardState} />
                </React.Fragment>
            )}
            {!!bookState.value === false && (
                <div
                    onClick={() => bookState.set(createCharacterBook())}
                    className='text-interactive flex flex-row items-center mb-4 hover:cursor-pointer select-none'
                >
                    <span className='mr-2 material-symbols-outlined'>Add</span>
                    <span>添加一条世界书</span>
                </div>
            )}
        </React.Fragment>
    )
}
