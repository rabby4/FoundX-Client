interface IDate {
	calender: {
		identifier: string
	}
	day: number
	era: string
	month: number
	year: number
}

const dateToISO = (date: IDate) => {
	return new Date(`${date?.day}-${date?.month}-${date?.year}`).toISOString()
}
export default dateToISO
