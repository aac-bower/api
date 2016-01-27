## Data
{
	_string: 'string',
	_int: 1,
	_array: ['item1', 'item2', 'item3'],
	_object: {
		_propertyInt: 1,
		_propertyString: 'string'
	}
}

## $httpParamsSerializerJQLike()
	_array[]:item1
	_array[]:item2
	_array[]:item3
	_int:1
	_object[_propertyInt]:1
	_object[_propertyString]:string
	_string:string

## $httpParamsSerializer()
	_array:item1
	_array:item2
	_array:item3
	_int:1
	_object:{"_propertyInt":1,"_propertyString":"string"}
	_string:string

## FormUrlEncoded()
	_string:string
	_int:1
	_array[2]:item3
	_array[1]:item2
	_array[0]:item1
	_object[_propertyInt]:1
	_object[_propertyString]:string

## FormUrlEncoded() | Arrays as JSON
	_string:string
	_int:1
	_array:["item1","item2","item3"]
	_object[_propertyInt]:1
	_object[_propertyString]:string

## JSON
	{
		"_string":"string",
		"_int":1,
		"_array":["item1","item2","item3"],
		"_object":{
			"_propertyInt":1,
			"_propertyString":"string"
		}
	}