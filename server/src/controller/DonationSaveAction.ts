import {Context} from "koa";
import {getManager} from "typeorm";
import {CURRENCIES, Donation} from "../entity/Donation";
import {v4 as uuidv4} from "uuid";
import {object, string, number} from "joi"

export async function DonationSaveAction(ctx: Context, next: () => void) {
    const validation = DONATION_SCHEMA.validate(ctx.request.body);

    if (validation.error) {
        ctx.body = {
            ok: false,
            error: validation.error.details[0]?.message,
        };

        await next();

        return;
    }

    const {
        amount,
        currency,
    } = ctx.request.body;

    const donation_repository = getManager().getRepository(Donation);
    const new_donation = donation_repository.create({ amount, currency, id: uuidv4() });
    await donation_repository.save(new_donation);

    ctx.body = {ok: true };

    await next();
}

const DONATION_SCHEMA = object().keys({
    amount: number().integer().greater(0).required(),
    currency: string().valid(...CURRENCIES).required(),
});
