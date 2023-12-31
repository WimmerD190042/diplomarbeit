using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrdersDb.Migrations
{
    /// <inheritdoc />
    public partial class OrderSalesDayIdAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_SalesDays_SalesDayId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "SalesDayId",
                table: "Orders",
                newName: "salesDayId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_SalesDayId",
                table: "Orders",
                newName: "IX_Orders_salesDayId");

            migrationBuilder.AlterColumn<int>(
                name: "salesDayId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_SalesDays_salesDayId",
                table: "Orders",
                column: "salesDayId",
                principalTable: "SalesDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_SalesDays_salesDayId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "salesDayId",
                table: "Orders",
                newName: "SalesDayId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_salesDayId",
                table: "Orders",
                newName: "IX_Orders_SalesDayId");

            migrationBuilder.AlterColumn<int>(
                name: "SalesDayId",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_SalesDays_SalesDayId",
                table: "Orders",
                column: "SalesDayId",
                principalTable: "SalesDays",
                principalColumn: "Id");
        }
    }
}
