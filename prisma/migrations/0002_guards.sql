CREATE TRIGGER product_stock_insert BEFORE INSERT ON Product WHEN NEW.stock < 0
BEGIN SELECT RAISE(ABORT, 'Stock insuficiente'); END;
CREATE TRIGGER product_stock_update BEFORE UPDATE OF stock ON Product WHEN NEW.stock < 0
BEGIN SELECT RAISE(ABORT, 'Stock insuficiente'); END;
CREATE TRIGGER cart_amount_insert BEFORE INSERT ON CartProduct WHEN NEW.amount <= 0
BEGIN SELECT RAISE(ABORT, 'Cantidad inválida'); END;
CREATE TRIGGER cart_amount_update BEFORE UPDATE OF amount ON CartProduct WHEN NEW.amount <= 0
BEGIN SELECT RAISE(ABORT, 'Cantidad inválida'); END;
CREATE TRIGGER workshop_capacity BEFORE INSERT ON OnSiteWorkshopAttendance
WHEN (SELECT count(*) FROM OnSiteWorkshopAttendance WHERE onSiteWorkshopId = NEW.onSiteWorkshopId)
  >= (SELECT places FROM OnSiteWorkshop WHERE workshopId = NEW.onSiteWorkshopId)
BEGIN SELECT RAISE(ABORT, 'No quedan plazas'); END;
