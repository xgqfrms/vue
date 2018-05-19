const cols = [
    {
        "key": "name",
        "title": "Name",
        "colspan": 1,
        "rowspan": 2,
        "children": null,
    },
    {
        "key": "age",
        "title": "Age",
        "colspan": 1,
        "rowspan": 2,
        "children": null,
    },
    {
        "key": "addreess",
        "title": "Addreess",
        "colspan": 2,
        "rowspan": 1,
        "children": [
            {
                "key": "country",
                "title": "Country",
                "colspan": 1,
                "rowspan": 1,
                "children": null,
            },
            {
                "key": "city",
                "title": "City",
                "colspan": 1,
                "rowspan": 1,
                "children": null,
            },
        ],
    },
];

const datas = [
    {
        "key": "001",
        "name": "xgqfrms",
        "age": 23,
        "country": "China",
        "city": "shanghai"
    },
    {
        "key": "002",
        "name": "Jackson",
        "age": 17,
        "country": "USA",
        "city": "LA"
    },
    {
        "key": "003",
        "name": "king",
        "age": 27,
        "country": "Korea",
        "city": "Seoul"
    },
];


const recursiveTrs = (cols = []) => {
    let trs = ``,
        newTr = ``,
        ths = ``;
    const delayTest = (children = []) => {
        newTr += recursiveTrs(children);
    };
    let arr = [];
    cols.forEach(
        (col, i) => {
            let {
                key,
                title,
                children,
                colspan,
                rowspan
            } = {...col};
            ths += `
                <th colspan="${colspan}" rowspan="${rowspan}" data-key="key">
                    ${title}
                </th>
            `;
            console.log(`${i} ths =`, ths);
            if(children !== null) {
                // console.log(`${i} new trs =`, trs);
                // trs += recursiveTrs(children);
                // peer  deep ???
                children.forEach(
                    (obj, i) => {
                        arr.push(obj);
                    }
                );
            }
        }
    );
    trs += `
        <tr>
            ${ths}
        </tr>
    `;
    if (arr.length) {
        delayTest(arr);
    }
    trs += newTr;
    console.log(`return trs =`, trs);
    return trs;
};



const cols = [
    {
        "key": "name",
        "title": "Name",
        "colspan": 1,
        "rowspan": 3,
        "children": null,
    },
    {
        "key": "addreess",
        "title": "Addreess",
        "colspan": 4,
        "rowspan": 1,
        "children": [
            {
                "key": "country",
                "title": "Country",
                "colspan": 2,
                "rowspan": 1,
                "children": [
                    {
                        "key": "language",
                        "title": "Language",
                        "colspan": 1,
                        "rowspan": 1,
                        "children": null,
                    },
                    {
                        "key": "population",
                        "title": "Population",
                        "colspan": 1,
                        "rowspan": 1,
                        "children": null,
                    },
                ],
            },
            {
                "key": "city",
                "title": "City",
                "colspan": 2,
                "rowspan": 1,
                "children": [
                    {
                        "key": "code",
                        "title": "Code",
                        "colspan": 1,
                        "rowspan": 1,
                        "children": null,
                    },
                    {
                        "key": "rank",
                        "title": "Rank",
                        "colspan": 1,
                        "rowspan": 1,
                        "children": null,
                    },
                ],
            },
        ],
    },
    {
        "key": "age",
        "title": "Age",
        "colspan": 1,
        "rowspan": 3,
        "children": null,
    }
];

// bug
