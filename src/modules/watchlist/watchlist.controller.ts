import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDTO } from './dto';
import { JwtAuthGuard } from '../../guqrds/jwt-guard';
import { CreateAssetResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API/Watchlist')
  @ApiResponse({status: 201, type: CreateAssetResponse})
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDto: WatchlistDTO, @Req() request): Promise<CreateAssetResponse> {
    const user = request.user
    return this.watchlistService.createAsset(user, assetDto)
  }

  @ApiTags('API/Watchlist')
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteAsset(@Query('id') assetId:  string, @Req() request): Promise<any> {
    const {id: userId} = request.user
    return  this.watchlistService.deleteAsset(userId, assetId)
  }
}
