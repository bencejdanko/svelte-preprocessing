import { Globe, Lock, Folder, Smartphone, AtSign } from "lucide-svelte";
import { type Icon } from 'lucide-svelte'

enum Categories {
    Security = 'security',
    Web = 'web',
    Mobile = 'mobile',
    Misc = 'misc',
    Visualization = 'visualization'
}

enum Tags {
    Svelte = 'svelte',
    Software = 'software',
    Security = 'security',
    Authentication = 'authentication',
    Transpiler = 'transpiler',
    Markup = 'markup',
    CSS = 'css',
    Javascript = 'javascript',
    MachineLearning = 'machine learning',
    Python = 'python',
    Kaggle = 'kaggle',
    PowerBI = 'powerbi'
}

type IndexInfo = {
    title: string;
    desc: string;
    marquee: {
        images: {
            src: string;
            alt: string;
        }[];
    }
}

export type Category = {
    [key in Categories]: typeof Icon;
}

export type Article = {
    category: Categories | null;
    file: string;
    title: string;
    desc: string;
    color: string;
    date: string;
    tags: Tags[];
    bg: string;
    showcase: string;
};

export type Metadata = {
    indexInfo: IndexInfo;
    categories: Category;
    articles: Article[];
};

export const metadata: Metadata = {

    indexInfo: {
        title: '32kb.dev',
        desc: 'Developer and data analyst. 2024 CS B.S, 2026 MSDA at SJSU.',
        marquee: {
            images: [{
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/100px-Unofficial_JavaScript_logo_2.svg.png',
                alt: 'Javascript'
            },
            {
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/100px-Python-logo-notext.svg.png',
                alt: 'Python'
            },
            {
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/100px-Typescript_logo_2020.svg.png',
                alt: 'Typescript'
            },
            {
                src: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Power_BI_logo.svg/70px-Power_BI_logo.svg.png',
                alt: 'powerbi'
            },

            {
                src: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Tableau_logo.svg/250px-Tableau_logo.svg.png',
                alt: 'Tableau'

            },
        
        ]
        }
    },

    categories: {
        [Categories.Security]: Lock,
        [Categories.Web]: Globe,
        [Categories.Mobile]: Smartphone,
        [Categories.Misc]: AtSign,
        [Categories.Visualization]: AtSign,
    },

    articles: [
        {
            category: Categories.Web,
            file: 'markup0',
            title: 'Svelte preprocessing: creating our own templating language.',
            desc: "Svelte provides a simple framework for preprocessing the contents of your svelte files. We'll create a simple lex of our custom tags, and generate the .svelte content we want.",
            color: '',
            date: '2024-10-20',
            tags: [Tags.Software, Tags.Svelte],
            bg: '',
            showcase: 'banners/Designer2.png'
        },

        {
            category: Categories.Visualization,
            file: 'kaggle0',
            title: 'Kaggle0: PowerBI Visualizations with Jane Street Real-Time Market Data',
            desc: "",
            color: '',
            date: '2024-10-21',
            tags: [Tags.PowerBI, Tags.Kaggle],
            bg: '',
            showcase: ''

        }
    ]
};