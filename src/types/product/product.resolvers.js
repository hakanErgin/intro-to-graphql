import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

const products = () => {
  return Product.find({}).exec()
}

const product = (_, args) => {
  return Product.findById(args.id)
    .lean()
    .exec()
}

const newProduct = (_, args, ctx) => {
  return Product.create({ ...args.input, createdBy: ctx.user._id })
}

const updateProduct = (_, args) => {
  return Product.findOneAndUpdate(args.id, args.input, { new: true })
    .lean()
    .exec()
}

export default {
  Query: { products, product },
  Mutation: { newProduct, updateProduct },
  Product: {
    __resolveType(product) {}
  }
}
