module.exports = (client, member) => {
  console.log(`Welcoming ${member.name} to ${member.guild.name}`);
  member.guild.systemChannel.send(`Welcome to ${member.guild.name}, ${member.name}!`);
};
