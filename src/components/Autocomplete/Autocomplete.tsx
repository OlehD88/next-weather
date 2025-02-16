'use client'

import { useRef, useState } from 'react'
import clsx from 'clsx'

type AutocompleteProps = {
	inputId?: string
	label: string
	placeholder?: string
	searchResults: {
		label: string
		value: string
	}[]
	onSearchCallback: (search: string) => void
	onSearchResultClick: (value: string) => void
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
	inputId = 'input-autocomplete',
	placeholder = '',
	label,
	searchResults,
	onSearchCallback,
	onSearchResultClick,
}) => {
	const [search, setSearch] = useState('')
	const [showResults, setShowResults] = useState(false)

	const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current)
		}
		debounceTimeout.current = setTimeout(() => {
			onSearchCallback(e.target.value)
		}, 300)
	}

	const onFocus = () => {
		setShowResults(true)
	}

	const onBlur = () => {
		setShowResults(false)
	}

	const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setShowResults(false)
			onSearchResultClick(searchResults[0].value)
		}
	}

	const onOptionClick = (value: string) => {
		setShowResults(false)
		onSearchResultClick(value)
	}

	return (
		<div className="relative max-w-2xl w-full">
			<div>
				<div className="mb-2">
					<label htmlFor={inputId} className="accent-color text-lg">
						{label}
					</label>
				</div>
				<input
					id={inputId}
					type="text"
					placeholder={placeholder}
					value={search}
					onFocus={onFocus}
					onBlur={onBlur}
					onChange={onSearchChange}
					onKeyDown={onKeyPress}
					className="h-12 py-2 outline-none px-4 w-full text-lg rounded-md bg-[var(--secondary-bg)] text-[var(--primary-text)]"
				/>
			</div>
			<ul
				className={clsx('absolute left-0 right-0 top-full bg-[var(--secondary-bg)]', {
					block: showResults,
					hidden: !showResults,
				})}
			>
				{searchResults.map((result) => (
					<li
						key={result.value}
						className="py-2 px-4 cursor-pointer hover:text-[var(--secondary-color)]"
						onClick={() => onOptionClick(result.value)}
					>
						{result.label}
					</li>
				))}
			</ul>
		</div>
	)
}
