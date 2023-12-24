export enum RabbitMQ {
  UserQueue = 'users',
  ProductoQueue = 'productos',
}
export enum UserMSG {
Create = 'create_user',
Update = 'update_user',
Delete = 'delete_user',
GetAll = 'get_all_users',
GetById = 'get_user_by_id',
  Valid = 'validate_user',
}
export enum ProductoMSG{
  Create='create_producto',
  Update='update_producto',
  Delete='delete_producto',
  GetAll='get_all_productos',
  GetById='get_producto_by_id',
}