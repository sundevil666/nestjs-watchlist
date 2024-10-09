import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { CreateAssetResponse } from './response';

@Injectable()
export class WatchlistService {

  constructor(@InjectModel(Watchlist) private readonly watchlistRepository: typeof Watchlist) {}

  async createAsset(user, dto): Promise<CreateAssetResponse> {
    try {
      const watchlist = {
        user: user.id,
        name: dto.name,
        assetsId: dto.assetsId
      }
      await this.watchlistRepository.create(watchlist)
      return watchlist
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async deleteAsset (userId: number, assetId: string): Promise<number> {
    try {
      return  this.watchlistRepository.destroy({
        where: {
          id: assetId,
          user: userId,
        }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
