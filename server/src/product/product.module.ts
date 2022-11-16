import {forwardRef, Module} from '@nestjs/common';
import {ProductService} from './product.service';
import {ProductController} from './product.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "./models/product.model";
import {Category} from "../category/models/category.model";
import {Description} from "../description/models/description.model";
import {CommentModel} from "../comment/models/comment.model";
import {Decoration} from "../decoration/models/decoration.model";
import {Type} from "../type/type.model";
import {Cake} from "../cake/models/cake.model";
import {Cream} from "../cream/models/cream.model";
import {Picture} from "../picture/picture.model";
import {Size} from "../size/models/size.model";
import {Nuance} from "../nuance/models/nuance.model";
import {Property} from "../property/models/property.model";
import {CategoryModule} from "../category/category.module";
import {DescriptionModule} from "../description/description.module";
import {FileService} from "../file/file.service";
import {PictureService} from "../picture/picture.service";
import {PictureModule} from "../picture/picture.module";
import {CakeModule} from "../cake/cake.module";
import {CreamModule} from "../cream/cream.module";
import {SizeModule} from "../size/size.module";
import {NuanceModule} from "../nuance/nuance.module";
import {DecorationModule} from "../decoration/decoration.module";
import {PropertyModule} from "../property/property.module";
import {FileModule} from "../file/file.module";

@Module({
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService, ProductModule],
    imports: [SequelizeModule.forFeature([Product, Category, Description, CommentModel, Type, Decoration, Cake, Cream, Picture, Size, Nuance, Property]), CategoryModule, DescriptionModule, PictureModule, CakeModule, CreamModule, SizeModule, NuanceModule, DecorationModule, PropertyModule, FileModule]

})
export class ProductModule {}
