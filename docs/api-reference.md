# API Reference

This document provides a comprehensive reference for the REST API endpoints used in this software.

## Medicines

#### Get all medicines

```http
  GET /medicines
```

| Parameter       | Type     | Description                                                                             |
| :-------------- | :------- | :-------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Patient, Pharmacist or Admin. |

#### Add a new medicine

```http
  POST /medicines
```

| Parameter           | Type       | Description                                                           |
| :------------------ | :--------- | :-------------------------------------------------------------------- |
| `name`              | `string`   | **Required**. Name of the medicine.                                   |
| `activeIngredients` | `string[]` | **Required**. Active ingredients of the medicine.                     |
| `price`             | `number`   | **Required**. The price of this medicine in EGP.                      |
| `availableQuantity` | `string`   | **Required**. The initial available stock of this medicine.           |
| `Authorization`     | `string`   | **Required**. JWT Token signed by a user having a role of Pharmacist. |

#### Search for medicines

```http
  GET /medicines/search?name={name}
```

| Parameter       | Type     | Description                                                                             |
| :-------------- | :------- | :-------------------------------------------------------------------------------------- |
| `name`          | `string` | **Required**. Name of the medicine(s) being searched for.                               |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Patient, Pharmacist or Admin. |

#### Bulk update medicines

```http
  PATCH /medicines/bulk-update
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `updates` | `object` | **Required**. Updates to the medicines. |

| Attribute | Type | Description   |
| :-------- | :--- | :------------ |
| ``        | ``   | **Optional**. |
| ``        | ``   | **Optional**. |
| ``        | ``   | **Optional**. |
| ``        | ``   | **Optional**. |

#### Update a medicine

```http
  PATCH /medicines/:id
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. Updates to the medicines. |
| ``        | ``       | **Optional**.                           |
| ``        | ``       | **Optional**.                           |
