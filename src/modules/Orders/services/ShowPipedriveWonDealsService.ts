const pipedrive = require('pipedrive');

export class ShowPipedriveWonDealsService {
  async execute() {
    pipedrive.Configuration.apiToken = process.env.PIPEDRIVE_API_TOKEN;
    const user = await pipedrive.UsersController.getCurrentUserData();

    const userData = {
      userId: user.id,
      status: 'won',
    };

    return await pipedrive.DealsController.getAllDeals(userData);
  }
}
