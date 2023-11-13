export type LoginResponse =
    | {
        token: string;
        authorized: boolean;
        msg: string;
    }
    | {
        msg: string;
    };

export type emailResponse =
    | {
        msg: string;
        token: string;
    }
    | {
        msg: string;
    }

export type product = 
| {
    title: String;
    price: Number;
    description: String;
    image: string;
}