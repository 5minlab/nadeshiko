import * as yup from 'yup';

interface TableReq {
	table: string;
}

export const tableSchema = yup.object().shape<TableReq>({
	table: yup.string().required(),
});

interface ItemReq {
	table: string;
	id: number | string;
}

export const itemSchema = yup.object().shape<ItemReq>({
	table: yup.string().required(),
	id: yup.mixed().required(),
});
