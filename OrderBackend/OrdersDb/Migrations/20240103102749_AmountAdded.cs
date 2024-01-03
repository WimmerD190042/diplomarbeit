using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrdersDb.Migrations
{
    /// <inheritdoc />
    public partial class AmountAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PaidStatus",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "amount",
                table: "Orders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_SalesDays_SalesDayId",
                table: "Orders",
                column: "SalesDayId",
                principalTable: "SalesDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_SalesDays_SalesDayId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PaidStatus",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "amount",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "SalesDayId",
                table: "Orders",
                newName: "salesDayId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_SalesDayId",
                table: "Orders",
                newName: "IX_Orders_salesDayId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_SalesDays_salesDayId",
                table: "Orders",
                column: "salesDayId",
                principalTable: "SalesDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
