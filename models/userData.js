// Create the model that connects the user data table
//This model will get data from userData table
//ID of user logged in

module.exports = function(sequelize, DataTypes) {
  var Services = sequelize.define("Services", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    serviceTitle: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    serviceUserName: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    servicePassword: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });
  
  // //  Contain column for user id, technology, , username for platform, and password for platform
  // // the userData will belong to a specific user
  // Post.associate = function(models) {
  //   // We're saying that a Post should belong to an Author
  //   // A Post can't be created without an Author due to the foreign key constraint
  //   Post.belongsTo(models.Author, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Services;
};
