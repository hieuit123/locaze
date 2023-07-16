import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EntryData } from '../../common/dto/entry-data.dto';
import { ApiOkResponse } from '../../decorators/api-ok-response.decorator';
import { ApiPageOkResponse } from '../../decorators/api-page-ok-response.decorator';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Auth([])
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({
    type: Project,
    description: 'Successfully',
  })
  async create(@Body() createProjectDto: CreateProjectDto, @AuthUser() user) {
    const data = await this.projectService.create(createProjectDto, user);
    return new EntryData({
      data,
    });
  }

  @Auth([])
  @ApiBearerAuth()
  @Get()
  @ApiPageOkResponse({
    type: Project,
    description: 'Successfully',
  })
  async findAll() {
    const data = await this.projectService.findAll();
    return new EntryData({
      data,
    });
  }

  @Auth([])
  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({
    type: Project,
    description: 'Successfully',
  })
  async findOne(@Param('id') id: string) {
    const data = await this.projectService.findOne({
      id: +id,
    });
    return new EntryData({
      data,
    });
  }

  @Auth([])
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({
    type: Project,
    description: 'Successfully',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    const data = await this.projectService.update(+id, updateProjectDto);
    return new EntryData({
      data,
    });
  }

  @Auth([])
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({
    type: Project,
    description: 'Successfully',
  })
  async remove(@Param('id') id: string) {
    const data = await this.projectService.remove(+id);
    return new EntryData({ data });
  }
}
