import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'

const stackType = new GraphQLObjectType({
  name: 'Stack',
  description: 'A Stack is a group of actions that can be triggered at once or sequentially by a controller',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    actions: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'stackActionType',
          description: 'An action is something that happens on a device or piece of software',
          fields: {
            id: {
              type: GraphQLString
            },
            deviceid: {
              type: GraphQLString
            },
            providerFunctionID: {
              type: GraphQLString
            },
            functionLabel: {
              type: GraphQLString
            },
            parameters: {
              type: new GraphQLList(
                new GraphQLObjectType({
                  name: 'stackActionParameters',
                  fields: {
                    id: {
                      type: GraphQLString
                    },
                    value: {
                      type: GraphQLString
                    }
                  }
                })
              )
            }
          }
        })
      )
    }
  }
})

export default stackType