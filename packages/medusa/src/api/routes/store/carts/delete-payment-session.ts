import { defaultStoreCartFields, defaultStoreCartRelations } from "."
import { CartService } from "../../../../services"

/**
 * @oas [delete] /carts/{id}/payment-sessions/{provider_id}
 * operationId: DeleteCartsCartPaymentSessionsSession
 * summary: "Delete a Payment Session"
 * description: "Deletes a Payment Session on a Cart. May be useful if a payment has failed."
 * parameters:
 *   - (path) id=* {string} The id of the Cart.
 *   - (path) provider_id=* {string} The id of the Payment Provider used to create the Payment Session to be deleted.
 * tags:
 *   - Cart
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           properties:
 *             cart:
 *               $ref: "#/components/schemas/cart"
 */
export default async (req, res) => {
  const { id, provider_id } = req.params

  const cartService: CartService = req.scope.resolve("cartService")

  await cartService.deletePaymentSession(id, provider_id)
  const cart = await cartService.retrieve(id, {
    select: defaultStoreCartFields,
    relations: defaultStoreCartRelations,
  })

  res.status(200).json({ cart })
}
